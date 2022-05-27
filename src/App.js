import { useState } from 'react';
import './App.scss';
import { checkUploadedFile, loadData } from './Data';
import ExpandableList from './ExpandableList';

function App() {
  const [data, setData] = useState(loadData);
  const [file, setFile] = useState(null);
  console.log(data);
  function onChange(e) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      const file = evt.target.result;
      const parsedFile = JSON.parse(file);
      const result = checkUploadedFile(parsedFile);
      if (result)
        setFile(parsedFile);
      else
        console.log('problems');
    };
    reader.readAsText(e.target.files[0]);
  }


  function generateList(e) {
    setData(file);
    console.log(file);
    e.target.disabled = true;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Softwarely recruitment task
        </p>
      </header>
      <main id='main'>
        <label htmlFor='fileDrop'>

        </label>
        <input type='file' accept='.json' id='fileDrop' multiple={false} onChange={onChange} />
        <div className='expandableListBox'>
          <h2>List</h2>
          <button type="button" onClick={generateList} >
            Generate list from uploaded file
          </button>
          <ExpandableList data={data} />
        </div>
      </main>
    </div>
  );
}

export default App;
