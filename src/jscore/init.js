//import axios library to handle requests

import axios from 'axios';

//login
// export function userLogin(credentials){
//     return axios.post('/login', credentials)
// }

//logout
export function userLogout(credentials){
    return axios.post('/logout', credentials)
}


// =================================== User ========================================


//User list
export function getUsers(){
    return axios.get('/user')
}

//User new
export function addUser(formData){
    return axios.post('/user', formData)
}

//User Show
export function showUser(user){
    return axios.get(`/user/${user}`)
}

//User update
export function editUser(user, userForm){  
    return axios.put(`/user/${user}`, userForm)
}

//User activate
export function activateUser(user){  
    return axios.post(`/user/activate/status/${user}`)
}

//User deactivate
export function deactivateUser(user){  
    return axios.post(`/user/deactivate/status/${user}`)
}



// =================================== Book ========================================


//book list
export function getBooks(){
    return axios.get('/book')
}

//book new
export function addBook(formData){
    return axios.post('/book', formData)
}

//book Show
export function showBook(book){
    return axios.get(`/book/${book}`)
}

//book update
export function editBook(book, formData){  
    return axios.put(`/book/${book}`, formData)
}

//book update
export function deleteBook(book){  
    return axios.delete(`/book/${book}`)
}

//book status available
export function availableBook(book){  
    return axios.post(`/book/status/available/${book}`)
}

//book status unavailable
export function unavailableBook(book){  
    return axios.post(`/book/status/unavailable/${book}`)
}


// =================================== Loan ========================================

//book list
export function getLoans(){
    return axios.get('/loan')
}

//request a loan
export function requestLoan(loan, formData){  
    return axios.post(`/book/borrow/${loan}`, formData)
}

//approve loan 
export function approveLoan(loan){  
    return axios.post(`/loan/approve/${loan}`)
}

//rejected loan 
export function rejectLoan(loan){  
    return axios.post(`/loan/reject/${loan}`)
}


//unique loan data
export function showLoan(loan){  
    return axios.get(`/loan/${loan}`)
}

//extent loan update
export function extendLoan(loan, formData){  
    return axios.post(`/extend/loan/${loan}`, formData)
}

//return loan 
export function returnLoan(loan){  
    return axios.post(`/loan/return/${loan}`)
}






// ===================================Book category ========================================

//categories list
export function getCategories(){
    return axios.get('/category')
}

//category new
export function addCategory(formData){
    return axios.post('/category', formData)
}

//category Show
export function showCategory(category){
    return axios.get(`/category/${category}`)
}

//category update
export function editCategory(category, formData){  
    return axios.put(`/category/${category}`, formData)
}

//category delete
export function deleteCategory(category){  
    return axios.delete(`/category/${category}`)
}


// ===================================Book sub category ========================================

//sub categories list
export function getSubcategories(){
    return axios.get('/subcategory')
}

//sub category new
export function addSubcategory(formData){
    return axios.post('/subcategory', formData)
}

//sub category Show
export function showSubcategory(subcategory){
    return axios.get(`/subcategory/${subcategory}`)
}

//sub category update
export function editSubcategory(subcategory, formData){  
    return axios.put(`/subcategory/${subcategory}`, formData)
}

//sub category delete
export function deleteSubcategory(subcategory){  
    return axios.delete(`/subcategory/${subcategory}`)
}


// +++++++++++++++++++++++++++++++++++++++++++++ SELECT OPTION LIST +++++++++++++++++++++++++++++++++++++++++++++++

//User roles list to integrate on select option
export function getSelectOptionsRoles(){
    return axios.get('/user/role')
}


// +++++++++++++++++++++++++++++++++++++ DASHBOARD +++++++++++++++++++++++++++++++++++

//dashboard books info 
export function bookChart(){
    return axios.get('/dashboard/book')
}

//dashboard loans info
export function loanChart(){
    return axios.get('/dashboard/loan')
}
