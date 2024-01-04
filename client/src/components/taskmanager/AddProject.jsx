

const AddProject = () => {
    return (
      <div className="p-3 bg-white rounded-lg shadow-md">
              <form onSubmit={''}>
                  <div className="mb-4">
                      <label htmlFor="task" className="block text-gray-700 font-bold mb-2">Add Project</label>
                      <input
                          type="text"
                          id="task"
                          name="task"
                          //value={state.task}
                          onChange={''}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                  </div>
                  <button type="submit" className="bg-blue-500 hover:bg-blue-900 text-sm text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline">
                      Add Project
                  </button>
              </form>
          </div>
    )
  }
  
  export default AddProject;