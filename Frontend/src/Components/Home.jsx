import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css'; // Optional: Add custom styles here

const HomePage = () => {
  return (
    <div className="bg-dark text-white min-vh-100 font-sans">
      {/* Top Bar */}
      <header className="d-flex justify-content-between align-items-center p-3">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-5" style={{ width: '40px', height: '40px' }}>
            <a href="profile.html" className="text-white text-decoration-none">D</a>
          </div>

          <nav className="bg-secondary rounded-pill px-2 py-1 d-flex gap-2 fw-semibold">
            <a href="index.html" className="btn btn-sm btn-outline-light rounded-pill">All</a>
            <a href="music.html" className="btn btn-sm btn-outline-light rounded-pill">Music</a>
            <a href="podcast.html" className="btn btn-sm btn-outline-light rounded-pill">Podcasts</a>
          </nav>
        </div>
      </header>

      {/* Artists / Moods Grid */}
      <section className="container mt-3">
        <div className="row g-3">
          {[
            { name: 'Jass Manak', img: 'https://i.pravatar.cc/60?img=26' },
            { name: 'HARNOOR All Songs', img: 'https://i.pravatar.cc/60?img=26' },
            { name: 'Mood', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8iZBz1akPPaleyjPQe4Pm8GrI3E4QeLKTsw&s' },
            { name: 'Rich & Famous', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXw9h4blHWM_yQnvTEi6o8y5zlkVSBs_1yA&s' },
            { name: 'Prm Nagra', img: 'https://i.pravatar.cc/60?img=26' },
            { name: 'Vikram Sarkar', img: 'https://i.pravatar.cc/60?img=26' },
            { name: 'Jasmine Sandlas', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIp_WyRI5yGnMIQHgpykEuY2tO0IBfGIOBkg&s' },
            { name: 'Gurnam Bhullar', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0_izU3txtjespNDsFKav4PxU9qPn63-Bs5g&s' },
          ].map((artist, index) => (
            <div className="col-6 col-sm-3" key={index}>
              <div className="d-flex align-items-center gap-3 bg-secondary rounded p-2">
                <img src={artist.img} alt={artist.name} className="rounded-circle" width="48" height="48" />
                <a href="player.html" className="text-white text-decoration-none fw-medium">{artist.name}</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="mt-5 px-4">
        <h4 className="fw-bold mb-3">New releases for you</h4>
        <div className="d-flex overflow-auto gap-4 pb-2">
          {[
            {
              title: 'Assi Code',
              artist: 'Karan Aujla, Karam Queen Akhtar',
              img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIp_WyRI5yGnMIQHgpykEuY2tO0IBfGIOBkg&s'
            },
            {
              title: 'Courtside',
              artist: 'Karan Aujla, Signature By SB',
              img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0_izU3txtjespNDsFKav4PxU9qPn63-Bs5g&s'
            },
            {
              title: 'BUCK (feat. Diljit)',
              artist: 'Jackson Wang, Diljit Dosanjh',
              img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8iZBz1akPPaleyjPQe4Pm8GrI3E4QeLKTsw&s'
            }
          ].map((item, index) => (
            <div key={index} className="flex-shrink-0" style={{ width: '160px' }}>
              <img src={item.img} alt={item.title} className="rounded img-fluid" />
              <p className="mt-2 fw-semibold text-white">{item.title}</p>
              <p className="text-muted small">{item.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jump Back In */}
      <section className="mt-5 px-4">
        <h4 className="fw-bold mb-3">Jump back in</h4>
        <div className="d-flex overflow-auto gap-3 pb-3">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="bg-secondary rounded p-2" style={{ minWidth: '150px' }}>
              <img src="https://i.pravatar.cc/150?img=10" alt="Notes" className="rounded w-100 mb-2" />
              <h6 className="fw-semibold">Notes</h6>
              <p className="text-muted small">Laddi Chahal</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recents */}
      <section className="mt-5 px-4">
        <div className="d-flex justify-content-between mb-3">
          <h4 className="fw-bold">Recents</h4>
          <button className="btn btn-link text-muted p-0">Show all</button>
        </div>
        <div className="d-flex overflow-auto gap-3 pb-3">
          {[
            { title: 'Rich & Famous', desc: 'Album • Jasmine Sandlas', img: 'https://i.pravatar.cc/120?img=14' },
            { title: 'HARNOOR All Songs', desc: 'Playlist • Spotify', img: 'https://i.pravatar.cc/120?img=15' },
            { title: 'Jass Manak', desc: 'Artist', img: 'https://i.pravatar.cc/120?img=16' },
            { title: 'Vikram Sarkar', desc: 'Artist', img: 'https://i.pravatar.cc/120?img=17' },
          ].map((item, index) => (
            <div key={index} className="bg-secondary rounded p-2" style={{ minWidth: '120px' }}>
              <img src={item.img} alt={item.title} className="rounded w-100 mb-2" />
              <h6 className="fw-semibold">{item.title}</h6>
              <p className="text-muted small">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Stations */}
      <section className="mt-5 px-4">
        <h4 className="fw-bold mb-3">Recommended Stations</h4>
        <div className="d-flex overflow-auto gap-3 pb-4">
          {[
            {
              title: 'Prm Nagra',
              artists: 'Bir, Tarna, Gagan Kooner, SAHIL CHEEMA...',
              mainImg: 'https://i.pravatar.cc/60?img=20',
              others: ['21', '22']
            },
            {
              title: 'Rich & Famous',
              artists: 'Guru Randhawa, Jasmine Sandlas, Nav...',
              mainImg: 'https://i.pravatar.cc/60?img=23',
              others: ['24', '25']
            },
            {
              title: 'Ranjit Bawa',
              artists: 'Ranjit Bawa, Manak, Gagan...',
              mainImg: 'https://i.pravatar.cc/60?img=26',
              others: ['27', '28']
            },
          ].map((station, index) => (
            <div key={index} className="bg-light text-dark rounded p-3" style={{ minWidth: '180px' }}>
              <div className="d-flex align-items-center mb-2">
                <img src={station.mainImg} alt="" className="rounded-circle me-2" width="48" height="48" />
                {station.others.map((imgId, i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/60?img=${imgId}`}
                    alt=""
                    className="rounded-circle border border-white"
                    style={{ width: '32px', height: '32px', marginLeft: '-10px' }}
                  />
                ))}
              </div>
              <h6 className="fw-bold">{station.title}</h6>
              <p className="small text-muted">{station.artists}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
