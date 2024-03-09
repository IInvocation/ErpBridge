export class SearchResult<TModel> {
    public pageIndex: number | any;
    public pageCount: number | any;
    public length: number | any;
    public pageSize: number | any;
    public records: TModel[] | any;
}