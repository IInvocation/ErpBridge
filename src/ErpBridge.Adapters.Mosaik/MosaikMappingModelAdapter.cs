using System.Text;
using ErpBridge.Adapters.Mosaik.ConnectionFactories;

namespace ErpBridge.Adapters.Mosaik;

/// <summary>   A mosaik mapping model adapter. </summary>
/// <typeparam name="TModel">   Type of the model. </typeparam>
public abstract class MosaikMappingModelAdapter<TModel> : MosaikModelAdapter<TModel>
{
    /// <summary>   A mosaik mapping model adapter. </summary>
    /// <typeparam name="TModel">   Type of the model. </typeparam>
    protected MosaikMappingModelAdapter(string tableName, IConnectionFactory connectionFactory) : base(connectionFactory)
    {
        TableName = !string.IsNullOrWhiteSpace(tableName) 
            ? tableName 
            : throw new ArgumentException("Invalid TableName");
    }

    /// <summary>   Gets the fields. </summary>
    /// <value> The fields. </value>
    protected abstract Dictionary<string, string> Fields { get; }

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
            sb.Append($"{field.Key} AS {field.Value}");
        }

        sb.Append($" FROM {TableName}");

        return sb.ToString();
    }

    /// <summary>   Gets count all query. </summary>
    /// <returns>   The count all query. </returns>
    protected override string GetCountAllStatement() =>  $"SELECT COUNT (*) FROM {TableName}";
}