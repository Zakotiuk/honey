using System.Collections.Generic;

namespace Aga.DTO.Results
{
    public class CollectionresultDTO
    {
        public class CollectionResultDto<T> : ResultDTO
        {
            public ICollection<T> Data { get; set; }
        }
    }
}