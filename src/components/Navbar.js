import React from 'react';

function Navbar(props) {
  return (
    <>
      <div>
        <h1 className="title">REAL TIME WEATHER</h1>
      </div>
      <div className="regionBox">
        <form className="region" onSubmit={(e)=>props.changeWeather(e)}>
          <input
            spellCheck="false"
            className="regioninput"
            placeholder="지역 검색"
            onChange={(e) => {
              props.changeRegion(e.target.value);
            }}>
            {/* App.js 에서 넘겨준 props changeWeather과 changeRegion을 각각 'props.changeWeather', 'props.changeRegion' 써줍니다. */}
          </input>
        </form>
      </div>
    </>
  )
}

export default Navbar;