import './App.css';
import {useState,useEffect} from 'react'
import Pagination from './components/Pagination';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  
  const [show,setShow] = useState(false);
  const view = (idx) =>{
    if(idx){
      setShow(!show);
    }
  }
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
    }, []);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = data.slice(firstPostIndex, lastPostIndex);

    const view_arr=[]
    for(let i=0;i<data.length;i++){
      view_arr[i]=false;
    }
    //console.log(view_arr)
  return (
    <div className='main'>
      
      {currentPosts.map(item => (
        <div >
          <div className='box' style={{display:'flex'}}>
            <div >{item.company.name}</div>
            <div >
              <div style={{paddingBottom:'px',fontWeight:'bolder'}}>CONTACT</div>
              <div>{item.name}</div>
            </div>
            <div ><div style={{paddingBottom:'px',fontWeight:'bolder'}}>CITY</div><div>{item.address.city}</div></div>
            <div ><div style={{paddingBottom:'px',fontWeight:'bolder'}}>ZIPCODE</div><div>{item.address.zipcode}</div></div>
            <div><button value={false} id={item.id} onClick={()=>view(item.id)} >View details</button></div> 
          </div>
          <div >
          {
            show ? <div className='box' >
              <h3>DESCRIPTION {item.id}</h3>
          <p>The value of the React state is toggled simply by updating with “!show“. Therefore, every time toggleShow function is called, the Boolean value of “show” state changes from true to false or vice versa.</p>
            </div>
            :
            <p></p>
          }

        </div>
          <div>
        
      </div>
        </div>
      ))}
      
      <Pagination
        totalPosts={data.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
    />
    </div>
  );
}

export default App;
