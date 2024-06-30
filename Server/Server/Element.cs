using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server
{
    public class Element
    {
        [Column("id")]
        [Key]
        public int Id { get; set; }

        [Column("category_name")]
        public string CategoryName { get; set; }

        [Column("img_path")]
        public string ImgPath { get; set; }
    }
}
