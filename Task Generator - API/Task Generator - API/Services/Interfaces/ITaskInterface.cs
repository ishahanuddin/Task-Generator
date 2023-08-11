using System.Collections.Generic;
using System.Threading.Tasks;
using Task_Generator___API.ViewModels;

namespace Task_Generator___API.Services.Interfaces
{
    public interface ITaskInterface
    {
        Response<Models.Task> CreateTask(string taskName);
        Response<List<Models.Task>> GetTasks();
        Response<string> DeleteTasks(List<int> ids);
    }
}
