// DATABASE OPERATIONS

const createDB = async (model, data) => {
  try {
    const result = await model(data).save();
    if (result !== null) {
      console.log("Record Created", { recordId: result._id });
      return result;
    } else {
      console.log("Record Not Created");
      return false;
    }
  } catch (error) {
    console.log("Error Creating Record", ({ data }, { error }));
    return false;
  }
};

const readDB = async (model, query, fields) => {
  try {
    const result = await model.find(query).select(fields);
    if (result) {
      console.log("Record Read", { recordId: result._id });
      return result;
    } else {
      console.log("Record Not Read");
      return false;
    }
  } catch (error) {
    console.log("Error Reading Record", {
      query,
      error,
    });
    return false;
  }
};

const readDBId = async (model, id, fields) => {
  try {
    console.log("ID", id);

    const result = await model.findById(id).select(fields);

    console.log("RESULT", result);

    if (result) {
      console.log("Record Read", { recordId: result._id });
      return result;
    } else {
      console.log("Record Not Read");
      return false;
    }
  } catch (error) {
    console.log("Error Reading Record", {
      id,
      error,
    });
    return false;
  }
};

const updateDB = async (model, query, data, fields) => {
  try {
    const result = await model
      .findOneAndUpdate(query, data, {
        new: true,
      })
      .select(fields);
    if (result) {
      console.log("Record Updated", { recordId: result });
      return result;
    } else {
      console.log("Record Not Updated");
      return false;
    }
  } catch (error) {
    console.log("Error Updating Record", ({ query }, { data }, { error }));
    return false;
  }
};

const updateDBId = async (model, id, data, fields) => {
  try {
    const result = await model
      .findByIdAndUpdate(id, data, {
        new: true,
      })
      .select(fields);
    if (result) {
      console.log("Record Updated", { recordId: result });
      return result;
    }
  } catch (error) {
    console.log("Error Updating Record", ({ id }, { data }, { error }));
    return false;
  }
};

const deleteDB = async (model, query) => {
  try {
    const result = await model.findOneAndDelete(query);

    if (result) {
      console.log("Record Deleted", { recordId: result._id });
      return result;
    } else {
      console.log("Record Not Deleted");
      return false;
    }
  } catch (error) {
    console.log("Error Deleting Record", ({ query }, { error }));
    return false;
  }
};

const deleteDBId = async (model, id) => {
  try {
    const result = await model.findByIdAndDelete(id);

    if (result) {
      console.log("Record Deleted", { recordId: result._id });
      return result;
    } else {
      console.log("Record Not Deleted");
      return false;
    }
  } catch (error) {
    console.log("Error Deleting Record", ({ id }, { error }));
    return false;
  }
};

// EXPORTING MODULES

export {
  createDB as CREATE_DB,
  readDB as READ_DB,
  readDBId as READ_DB_ID,
  updateDB as UPDATE_DB,
  updateDBId as UPDATE_DB_ID,
  deleteDB as DELETE_DB,
  deleteDBId as DELETE_DB_ID,
};
