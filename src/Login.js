function Login() {
  return (
    <div>
      <div className="input-filed">
        <label>Username</label>
        <input type="text" placeholder="Enter Name" />
      </div>

      <div className="input-filed">
        <label>Email</label>
        <input type="email" placeholder="Enter Email" />
      </div>

      <div className="input-filed">
        <label>Password</label>
        <input type="password" placeholder="Enter Password" />
      </div>
    </div>
  );
}

export default Login;
