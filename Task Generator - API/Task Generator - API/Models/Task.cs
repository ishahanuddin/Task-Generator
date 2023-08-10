using System.ComponentModel.DataAnnotations;

namespace Task_Generator___API.Models
{
    public class Task
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }
    }
}
