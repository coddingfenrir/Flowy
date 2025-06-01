namespace Flowy.Server.Models
{
    public class FlowyWorkFlowNameList
    {
        public int Id { get; set; }
        public string WorkFlowName { get; set; } = string.Empty;
        public DateTime CreateTime { get; set; } = DateTime.UtcNow;
    }
}
