import React, { useState , useEffect} from 'react';
import './App.css';
import items from './data'
function App() {
 
  const [status, setStatus] = useState()
  const [remark, setRemark] = useState("")
  const [newItem, setNewItem] = useState([])
  console.log(status)
  useEffect(() => {
    setNewItem(
    items.map(d=>{
      return{
      select:false,
      mobile:d.mobile,
      earning_id:d.earning_id,
      earning:d.earning 
      }
      
    })
  )
  
  }, [])
  let approve = (e) => {
    let itemObj = newItem.find(x=>x.earning_id === e.target.id)
    setStatus([{
      mobile: itemObj.mobile,
      id: itemObj.earning_id,
      earning:itemObj.earning,
      action: "approve"
    }]);
  }
  let approveMultiple = () => {
  let itemObj = newItem.filter(x=>x.select === true);
  setStatus(
    itemObj.map(d=>{
      return{
      mobile:d.mobile,
      id:d.earning_id,
      earning:d.earning ,
      action:"approve"
      }
      
    })
  )
  }

  let reject = (e) => {
    let itemObj = newItem.find((x) => x.earning_id === e.target.id);
    setStatus([{
      mobile: itemObj.mobile,
      id: itemObj.earning_id,
      earning:itemObj.earning,
      action: "reject",
      remark: remark
    }]);
  }

  return (
    <div className="App">
      <table id="customers">
        <tr>
          <th>Mobile</th>
          <th>Earning ID</th>
          <th>Earning</th>
          <th className="headerbutton">
          <div >Action</div>
          <div>
            <button onClick={approveMultiple} className="button button2">
              Approve Selected
            </button>
          </div>
          </th>
        </tr>
        {newItem.map((item) => (
          <tr>
            <td>{item.mobile}</td>
            <td>{item.earning_id}</td>
            <td>{item.earning}</td>
            <td className="action">
            <div>
              <button
                onClick={approve}
                id={item.earning_id}
                className="button button2"
              >
                Approve
              </button>
            </div>
            <div>
            <input onChange={e=>setRemark(e.target.value)} type="text"/>
              <button
                onClick={reject}
                id={item.earning_id}
                className="button button3"
              >
                Reject
              </button>
              </div>
              <div>
            <input
              type="checkbox"
              onChange={e=>{
                let checked = e.target.checked;
                setNewItem(
                  newItem.map(data=>{
                    if (item.earning_id === data.earning_id) {
                      data.select = checked;
                    }
                    return data
                  })
                )
              }}
              checked={item.select}
              value={item.earning_id}
            ></input>
            </div>
            </td>
            
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
