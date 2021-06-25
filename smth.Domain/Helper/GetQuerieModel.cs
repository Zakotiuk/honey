namespace schoolButNot.Domain
{
    public class GetQuerieModel // моделі не починаються з дієслова
    {
        public int Page { get; set; }
        public string searchText { get; set; } // все або з велокї букви
        public int sizeOfPage { get; set; }
        public string sorting { get; set; }
        public GetQuerieModel()
        {
            searchText = "";
        }
    }
}