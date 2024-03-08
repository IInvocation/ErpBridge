using System.Reflection;
using System.Text;
using ErpBridge.Adapters.Mosaik.ConnectionFactories;
using ErpBridge.Models.Sorting;

namespace ErpBridge.Adapters.Mosaik;

/// <summary>   A mosaik mapping model adapter. </summary>
/// <typeparam name="TModel">   Type of the model. </typeparam>
public abstract class MosaikMappingModelAdapter<TModel> : MosaikModelAdapter<TModel>
{
    /// <summary>   A mosaik mapping model adapter. </summary>
    /// <typeparam name="TModel">   Type of the model. </typeparam>
    protected MosaikMappingModelAdapter(string tableName, IConnectionFactory connectionFactory) : base(
        connectionFactory)
    {
        TableName = !string.IsNullOrWhiteSpace(tableName)
            ? tableName
            : throw new ArgumentException("Invalid TableName");

        // ReSharper disable once VirtualMemberCallInConstructor
        FilterFields = GetFilterFields();
    }

    /// <summary>   Gets the fields. </summary>
    /// <value> The fields. </value>
    protected abstract Dictionary<string, string> Fields { get; }

    /// <summary>   Gets or sets the filter fields. </summary>
    /// <value> The filter fields. </value>
    protected IEnumerable<string> FilterFields { get; set; }

    /// <summary>   Gets the default sort field. </summary>
    /// <value> The default sort field. </value>
    protected abstract string DefaultSortField { get; }

    /// <summary>   Gets the name of the table. </summary>
    /// <value> The name of the table. </value>
    protected virtual string TableName { get; }

    /// <summary>   Gets select all query. </summary>
    /// <returns>   The select all query. </returns>
    protected override string GetSelectAllStatement()
    {
        var sb = new StringBuilder();

        sb.Append("SELECT TOP 10");
        for (var i = 0; i < Fields.Count; i++)
        {
            var field = Fields.ElementAt(i);
            if (i > 0)
                sb.Append(',');
            sb.Append(' ');
            sb.Append($"[{field.Key}] AS[{field.Value}]");
        }

        sb.Append($" FROM {TableName}");

        return sb.ToString();
    }

    /// <summary>   Gets the filter fields in this collection. </summary>
    /// <returns>
    ///     An enumerator that allows foreach to be used to process the filter fields in this
    ///     collection.
    /// </returns>
    protected virtual IEnumerable<string> GetFilterFields()
    {
        var modelType = typeof(TModel);
        var properties = modelType.GetProperties(BindingFlags.Public | BindingFlags.Instance);
        return (from property in properties
            where property.PropertyType == typeof(string) && property.CanRead
            select property.Name).ToList();
    }

    /// <summary>   Gets count all query. </summary>
    /// <returns>   The count all query. </returns>
    protected override string GetCountAllStatement()
    {
        return $"SELECT COUNT (*) FROM {TableName}";
    }

    /// <summary>   Gets count search statement. </summary>
    /// <param name="sortField">    The sort field. </param>
    /// <param name="direction">    The direction. </param>
    /// <param name="pageIndex">    Zero-based index of the page. </param>
    /// <param name="pageSize">     Size of the page. </param>
    /// <param name="filter">       Specifies the filter. </param>
    /// <returns>   The count search statement. </returns>
    protected override string GetCountSearchStatement(string sortField, SortDirection direction, int pageIndex,
        int pageSize, string filter)
    {
        var sField = Fields.SingleOrDefault(f => f.Value == sortField).Key;
        var realSortField = string.IsNullOrWhiteSpace(sField) ? DefaultSortField : sField;

        var fDirection = direction == SortDirection.Descending ? "DESC" : "ASC";
        var sb = new StringBuilder();

        sb.Append("SELECT COUNT (*)");
        sb.Append($" FROM {TableName}");

        if (!string.IsNullOrWhiteSpace(filter)) sb.Append($" WHERE {BuildFilterPredicate(filter)}");

        return sb.ToString();
    }

    /// <summary>   Gets search statement. </summary>
    /// <param name="sortField">    The sort field. </param>
    /// <param name="direction">    The direction. </param>
    /// <param name="pageIndex">    Zero-based index of the page. </param>
    /// <param name="pageSize">     Size of the page. </param>
    /// <param name="filter">       Specifies the filter. </param>
    /// <returns>   The search statement. </returns>
    protected override string GetSearchStatement(string sortField, SortDirection direction, int pageIndex, int pageSize,
        string filter)
    {
        var sField = Fields.SingleOrDefault(f => f.Value == sortField).Key;
        var realSortField = string.IsNullOrWhiteSpace(sField) ? DefaultSortField : sField;

        var fDirection = direction == SortDirection.Descending ? "DESC" : "ASC";
        var sb = new StringBuilder();

        sb.Append("SELECT");
        for (var i = 0; i < Fields.Count; i++)
        {
            var field = Fields.ElementAt(i);
            if (i > 0)
                sb.Append(',');
            sb.Append(' ');
            sb.Append($"[{field.Key}] AS [{field.Value}]");
        }

        sb.Append($" FROM {TableName}");

        if (!string.IsNullOrWhiteSpace(filter)) sb.Append($" WHERE {BuildFilterPredicate(filter)}");

        sb.Append($" ORDER BY {realSortField} {fDirection}");

        sb.Append($" OFFSET {pageIndex * pageSize} ROWS FETCH NEXT {pageSize} ROWS ONLY");

        return sb.ToString();
    }

    /// <summary>   Builds filter predicate. </summary>
    /// <param name="filterValue">  The filter value. </param>
    /// <returns>   A string. </returns>
    protected virtual string BuildFilterPredicate(string filterValue)
    {
        var sb = new StringBuilder();
        for (var i = 0; i < FilterFields.Count(); i++)
        {
            var fField = FilterFields.ElementAt(i);
            var field = Fields.SingleOrDefault(f => f.Value == fField);

            if (!string.IsNullOrWhiteSpace(field.Value))
            {
                if (i > 0)
                    sb.Append(" OR ");
                sb.Append($"{field.Key} LIKE '%{filterValue}%'");
            }
        }

        var res = sb.ToString();

        return string.IsNullOrWhiteSpace(res) ? "0=0" : res;
    }
}