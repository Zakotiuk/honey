namespace smth.Domain.Helper
{
    public class EmailRequest
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public bool IsRegistration { get; set; }
        public string StudyDate { get; set; }
        public string CallbackURL { get; set; }
    }
}