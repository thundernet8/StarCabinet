import * as CONSTANTS from "../constants";
import DBHandler from "../rxdb/dbHandler";

export const updateCategoriesList = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.QUERY_CATEGORIES_LIST
        });

        const dbHandler = new DBHandler(getState().db);
        dbHandler
            .initDB()
            .then(() => dbHandler.getCategories())
            .then(categories => {
                dispatch({
                    type: CONSTANTS.QUERY_CATEGORIES_LIST_SUCCESS,
                    categories
                });
                return categories;
            })
            .catch(err => {
                dispatch({
                    type: CONSTANTS.QUERY_CATEGORIES_LIST_FAIL,
                    err
                });
                return err;
            });
    };
};

export const addNewCategory = name => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.ADD_CUSTOM_CATEGORY
        });

        const dbHandler = new DBHandler(getState().db);
        dbHandler
            .initDB()
            .then(() => dbHandler.upsertCategory(name))
            .then(categoryDoc => {
                dispatch({
                    type: CONSTANTS.ADD_CUSTOM_CATEGORY_SUCCESS,
                    category: categoryDoc.toJSON()
                });
                // refresh the categories list
                dispatch(updateCategoriesList());

                return categoryDoc;
            })
            .catch(err => {
                dispatch({
                    type: CONSTANTS.ADD_CUSTOM_CATEGORY_FAIL,
                    err
                });
                return err;
            });
    };
};

export const deleteCategory = id => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.DELETE_CUSTOM_CATEGORY
        });

        const dbHandler = new DBHandler(getState().db);
        dbHandler
            .initDB()
            .then(() => dbHandler.deleteCategory(id))
            .then(id => {
                dispatch({
                    type: CONSTANTS.DELETE_CUSTOM_CATEGORY_SUCCESS
                });
                // refresh the categories list
                dispatch(updateCategoriesList()); // maybe only need do this, reducer is not required

                return id;
            })
            .catch(err => {
                dispatch({
                    type: CONSTANTS.DELETE_CUSTOM_CATEGORY_FAIL,
                    err
                });
                return err;
            });
    };
};
