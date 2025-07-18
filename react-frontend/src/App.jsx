import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Welcome from './pages/Welcome';

// function App() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });

//   const [responseMsg, setResponseMsg] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg('');
//     setResponseMsg('');

//     try {
//       const res = await axios.post('http://192.168.0.45/api/send', formData);
//       setResponseMsg(res.data.message);
//     } catch (error) {
//       if (error.response) {
//         setErrorMsg(error.response.data.error);
//       } else {
//         setErrorMsg('Server not reachable');
//       }
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: '100px auto', fontFamily: 'Arial' }}>
//       <h2>Register User</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           style={{ width: '100%', marginBottom: 10, padding: 8 }}
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           style={{ width: '100%', marginBottom: 10, padding: 8 }}
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           style={{ width: '100%', marginBottom: 10, padding: 8 }}
//         />
//         <button type="submit" style={{ padding: 10, width: '100%' }}>
//           Submit
//         </button>
//       </form>
//       {responseMsg && <p style={{ color: 'green', marginTop: 10 }}>{responseMsg}</p>}
//       {errorMsg && <p style={{ color: 'red', marginTop: 10 }}>{errorMsg}</p>}
//     </div>
//   );
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}


export default App;
