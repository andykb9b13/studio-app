// use this to decode a token and get the user's information out of it
import decode from "jwt-decode";

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // Retrieves the user token from localStorage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // Retrieves the user type from localStorage
  getUser() {
    return localStorage.getItem("user");
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // Check if user is logged in. This is for security.
  loggedIn() {
    const token = this.getToken(); // Checks if there is a saved token and it's still valid
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // Logs user out and redirects to home page
  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
    return true;
  }

  // Saves user token to localStorage, sets "user" as "student" for teacherLoggedIn() method, and redirects to student page
  studentLogin(data) {
    let idToken;
    let studentId;
    // checks if data is coming from signup (addTeacher) or login

    idToken = data.studentLogin.token;
    studentId = data.studentLogin.student._id;

    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    localStorage.setItem("user", "student");
    window.location.assign(`/teacher/studentDetails/${studentId}`);
  }

  // Check if a teacher is logged in. This is only to determine conditional rendering in the appand does not provide any security
  teacherLoggedIn() {
    const user = this.getUser();
    return user === "teacher";
  }

  // Saves user token to localStorage, sets "user" as "teacher" for teacherLoggedIn() method, and redirects to teacher page
  teacherLogin(data) {
    let idToken;
    let teacherId;
    // checks if data is coming from signup (addTeacher) or login
    if (data.addTeacher) {
      idToken = data.addTeacher.token;
      teacherId = data.addTeacher.teacher._id;
    } else {
      idToken = data.teacherLogin.token;
      teacherId = data.teacherLogin.teacher._id;
    }

    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    localStorage.setItem("user", "teacher");
    window.location.assign(`/teacher/${teacherId}`);
  }
}

// instantiate the AuthService class
const Auth = new AuthService();

export default Auth;
