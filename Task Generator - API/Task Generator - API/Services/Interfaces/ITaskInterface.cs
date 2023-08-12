using System.Collections.Generic;
using System.Threading.Tasks;
using Task_Generator___API.ViewModels;

namespace Task_Generator___API.Services.Interfaces
{
    public interface ITaskInterface
    {
        ResponseViewModel<Models.Task> CreateTask(string taskName);
        ResponseViewModel<List<Models.Task>> GetTasks();
        ResponseViewModel<string> DeleteTasks(TaskIDsViewModel ids);
    }
}
