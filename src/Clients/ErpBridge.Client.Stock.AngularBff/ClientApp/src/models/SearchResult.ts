export class SearchResult<TModel> {
    public pageIndex: number | any;
    public pageCount: number | any;    
    public pageSize: number | any;
    public records: TModel[] | any;
    public recordCount: number | any;
}