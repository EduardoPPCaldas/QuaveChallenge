using System;

namespace QuaveChallenge.API.Models
{
    public class Community
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Person> People { get; set; } = [];
    }
} 