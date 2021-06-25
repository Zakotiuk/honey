using System.Collections.Generic;

namespace Aga.DTO
{
    public class ResultErrorDTO : ResultDTO
    {
        public List<string> Errors { get; set; }
    }
}