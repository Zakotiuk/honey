using System.Collections.Generic;

namespace schoolButNot.DTO
{
    public class ListStudentDTO
    {
        public List<StudentDTO> Students { get; set; }
        public int sizeOfPage { get; set; }
        public int totalCount { get; set; }
    }
}