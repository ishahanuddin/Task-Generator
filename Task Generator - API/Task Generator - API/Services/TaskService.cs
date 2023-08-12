using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task_Generator___API.Models;
using Task_Generator___API.Services.Interfaces;
using Task_Generator___API.ViewModels;

namespace Task_Generator___API.Services
{
    public class TaskService : ITaskInterface
    {
        private readonly DBContext _mainContext;
        public TaskService(DBContext context)
        {
            _mainContext = context;
        }
        public ResponseViewModel<Models.Task> CreateTask(string taskName)
        {
            var task = new Models.Task { Name = taskName, isDelete = false };
            _mainContext.Tasks.Add(task);
            _mainContext.SaveChanges();

            return new ResponseViewModel<Models.Task>
            {
                Data = task,
                Message = "Task added successfully",
                Success = true,
                Code = 200,
            };
        }

        ResponseViewModel<List<Models.Task>> ITaskInterface.GetTasks()
        {
            var tasks = _mainContext.Tasks.Where(x => x.isDelete == false).ToList();
            return new ResponseViewModel<List<Models.Task>>
            {
                Data = tasks,
                Message = "Tasks fetched successfully",
                Success = true,
                Code = 200,
            };
        }
        public ResponseViewModel<string> DeleteTasks(TaskIDsViewModel tasksIds)
        {
            var tasks = _mainContext.Tasks.Where(x => tasksIds.Ids.Contains(x.Id)).ToList();
            tasks.ForEach(x => x.isDelete = true);
            _mainContext.SaveChanges();

            return new ResponseViewModel<string>
            {
                Data = "Tasks Deleted Successfully",
                Message = "Tasks Deleted successfully",
                Success = true,
                Code = 200,
            };
        }
    }
}
