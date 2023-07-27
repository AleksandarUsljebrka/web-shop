const Home = ()=>{
return (
    <div>
    <h1>Welcome to Our Website</h1>
    <p>If you have an account, please login:</p>
    <form>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <br />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required />
      <br />
      <button type="submit">Login</button>
    </form>
    <p>If you don't have an account, please register:</p>
    <form>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />
      <br />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <br />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required />
      <br />
      <button type="submit">Register</button>
    </form>
  </div>
);
}

export default Home;
