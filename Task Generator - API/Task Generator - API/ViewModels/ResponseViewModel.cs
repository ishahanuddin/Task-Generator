using System.Collections.Generic;

namespace Task_Generator___API.ViewModels
{
    public class ResponseViewModel<T>
    {
        public T Data { get; set; }
        public bool Success { get; set; } = true;
        public string Message { get; set; } = null;
        public string Error { get; set; } = null;
        public int Code { get; set; } = 500;
        public List<string> ErrorMessages { get; set; } = null;
    }
}
