// use this to decode a token and get the user's information out of it
import decode from "jwt-decode";

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  teacherLoggedIn() {
    const user = this.getUser();
    return user === "teacher";
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

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  getUser() {
    return localStorage.getItem("user");
  }

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
    console.log("This is the_id in Auth.teacherLogin", teacherId);
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    localStorage.setItem("user", "teacher");
    window.location.assign(`/teacher/${teacherId}`);
  }

  studentLogin(data) {
    let idToken;
    let studentId;
    // checks if data is coming from signup (addTeacher) or login

    idToken = data.studentLogin.token;
    studentId = data.studentLogin.student._id;

    console.log("This is the_id in Auth.studentLogin", studentId);
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    localStorage.setItem("user", "student");
    window.location.assign(`/teacher/studentDetails/${studentId}`);
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
    return true;
  }
}

const Auth = new AuthService();

export default Auth;
