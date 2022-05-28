import { useState } from 'react';
import './App.scss';
import { checkUploadedFile, loadData } from './Data';
import ExpandableList from './ExpandableList';

function App() {
  const [data, setData] = useState(loadData);
  const [file, setFile] = useState(null);
  const [disabledButton, setDisabledButton] = useState(true);
  const [error, setError] = useState('');

  function onChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    reader.onload = function (evt) {
      let file = evt.target.result;
      try {
        let parsedFile = JSON.parse(file);
        let result = checkUploadedFile(parsedFile);
        if (result) {
          setFile(parsedFile);
          setDisabledButton(false);
          setError('');
        }
        else
          setError('Your file does not match schema');
      }
      catch (e) {
        console.log(e);
        setError('Parse problems')
      }

    };
    reader.readAsText(e.target.files[0]);
  }

  function onClick(e) {
    e.target.value = null;
  }


  function generateList(e) {
    setData(file);
    console.log(file);
    setDisabledButton(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Recruitment task
        </p>
      </header>
      <main id='main'>
        <label htmlFor='fileInput' className='buttonLabel'>
          Choose JSON file with list
        </label>
        <p className='error'>{error}</p>
        <input type='file' accept='.json' id='fileInput' multiple={false}
          onChange={onChange} style={{ display: 'none' }} onClick={onClick} />
        <div className='expandableListBox'>
          <h2>List</h2>
          <button type="button" onClick={generateList} disabled={disabledButton} className="generateButton">
            Generate list from uploaded file
          </button>
          <ExpandableList data={data} />
        </div>
      </main>
    </div>
  );
}

export default App;
