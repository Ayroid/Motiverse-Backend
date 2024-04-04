import { USERMODEL } from "../../models/userModel.js";

// DATABASE OPERATIONS

const createUserDB = async (data) => {
  try {
    const result = await USERMODEL(data).save();
    if (result !== null) {
      console.log("User Created", { userId: result._id });
      return result;
    } else {
      console.log("User Not Created", { userId: result._id });
      return false;
    }
  } catch (error) {
    console.log("Error Creating User", ({ data }, { error }));
    return false;
  }
};

const readUserDB = async (query, fields) => {
  try {
    const result = await USERMODEL.find(query).select(fields);
    if (result) {
      console.log("User Read", { userId: result._id });
      return result;
    } else {
      console.log("User Not Read", { userId: result._id });
      return false;
    }
  } catch (error) {
    console.log("Error Reading User", {
      query,
      error,
    });
    return false;
  }
};

const updateUserDB = async (query, data, fields) => {
  try {
    console.log(query, data);
    const result = await USERMODEL.findOneAndUpdate(query, data, {
      new: true,
    }).select(fields);
    if (result) {
      console.log("User Updated", { userId: result });
      return result;
    } else {
      console.log("User Not Updated", { userId: result });
      return false;
    }
  } catch (error) {
    console.log("Error Updating User", ({ query }, { data }, { error }));
    return false;
  }
};

const deleteUserDB = async (query) => {
  try {
    const result = await USERMODEL.findOneAndDelete(query);

    if (result) {
      console.log("User Deleted", { userId: result._id });
      return result;
    } else {
      console.log("User Not Deleted", { userId: result._id });
      return false;
    }
  } catch (error) {
    console.log("Error Deleting User", ({ query }, { error }));
    return false;
  }
};

// EXPORTING MODULES

export {
  createUserDB as CREATE_USER_DB,
  readUserDB as READ_USER_DB,
  updateUserDB as UPDATE_USER_DB,
  deleteUserDB as DELETE_USER_DB,
};
