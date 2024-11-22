import axiosInstance from '../axiosInstance'
const userBasePath = '/api';

export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post(`${userBasePath}/register/`, userData);
        console.log(response)
        return { 
            status: "success", 
            data: response.data 
        };
    } catch (err) {
        if (!err.response) throw err;
        return Promise.reject({
            status: err.response.status,
            message: err.response.data.message || "Something went wrong",
        });
    }
};

export const LoginUser = async (userData) => {
    try {
        const response = await axiosInstance.post(`${userBasePath}/login/`, userData);
        return { 
            status: "success", 
            data: response.data 
        };
    } catch (err) {
        if (!err.response) throw err;
        return Promise.reject({
            status: err.response.status,
            message: err.response.data.message || "Something went wrong",
        });
    }
};

export const UserHome = async () => {
    try {
        const response = await axiosInstance.get(`${userBasePath}/`);
        return { 
            status: "success", 
            data: response.data 
        };
    } catch (err) {
        if (!err.response) throw err;
        return Promise.reject({
            status: err.response.status,
            message: err.response.data.message || "Something went wrong",
        });
    }
};


export const NewBlog = async (payload) => {
    try {
        const response = await axiosInstance.post(`${userBasePath}/add-blog/`,payload);
        return { 
            status: "success", 
            data: response.data 
        };
    } catch (err) {
        if (!err.response) throw err;
        return Promise.reject({
            status: err.response.status,
            message: err.response.data.message || "Something went wrong",
        });
    }
};

export const EditABlog = async (id) => {
    try {
        const response = await axiosInstance.post(`${userBasePath}/edit-blog/${id}/`,payload);
        return { 
            status: "success", 
            data: response.data 
        };
    } catch (err) {
        if (!err.response) throw err;
        return Promise.reject({
            status: err.response.status,
            message: err.response.data.message || "Something went wrong",
        });
    }
};


export const GetBlogDetails = async (id) => {
    try {
        const response = await axiosInstance.get(`${userBasePath}/blogs/${id}/`);
        return { 
            status: "success", 
            data: response.data 
        };
    } catch (err) {
        if (!err.response) throw err;
        return Promise.reject({
            status: err.response.status,
            message: err.response.data.message || "Something went wrong",
        });
    }
};

export const UserBlogs = async () => {
    try {
        const response = await axiosInstance.get(`${userBasePath}/user-blogs/`);
        return { 
            status: "success", 
            data: response.data 
        };
    } catch (err) {
        if (!err.response) throw err;
        return Promise.reject({
            status: err.response.status,
            message: err.response.data.message || "Something went wrong",
        });
    }
};

export const UserLogout = async () => {
    try {
        const response = await axiosInstance.post(`${userBasePath}/logout/`);
        return { 
            status: "success", 
            data: response.data 
        };
    } catch (err) {
        if (!err.response) throw err;
        return Promise.reject({
            status: err.response.status,
            message: err.response.data.message || "Something went wrong",
        });
    }
};