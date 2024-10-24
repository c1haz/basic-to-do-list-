// Çarpı butonu oluştur ve eklenen tüm liste bloklarına ata, hepsine close classı ata
var myNodelist = document.getElementsByTagName("LI");
for (var i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("x");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Çarpıya bastığında basılan bloğu ilgili karta taşı

var close = document.getElementsByClassName("close");
for (var i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var listItem = this.parentElement;
    var category = listItem.getAttribute('value');
    
    // tüm kartları looplayıp headerlarından kategorilerini bul
    var cards = document.getElementsByClassName('card');
    for (var j = 0; j < cards.length; j++) {
      var cardHeader = cards[j].querySelector('.card-header');
      if (cardHeader && cardHeader.textContent.trim() === category) {
        
        // kartta liste boşsa yenisini yarat 
        var cardList = cards[j].querySelector('ul');
        if (!cardList) {
          cardList = document.createElement('ul');
          cards[j].appendChild(cardList);
        }
        
        // liste elemanını klonla
        var newItem = listItem.cloneNode(true);
        newItem.removeChild(newItem.querySelector('.close'));
        
        // liste elemanını karta ekle
        cardList.appendChild(newItem);
        
        // elemanı üstteki listeden sil 
        listItem.remove();
        break;
      }
    }
  }
}

// Listeye tıkladığında üstünü çiz
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Ekle'ye bastığında yeni liste elemanı ekle
function addTask() {
  // arama çubuğundan değer al
  var inputValue = document.getElementById("myInput").value;

  // kategori çubuğundan değer al
  var selectValue = document.getElementById("categorySelect").value;

  // yeni liste elemanı oluştur
  var li = document.createElement("li");

  // bir şey yazılmamışsa veya seçilmemişse hata ver
  if (inputValue === '') {
    alert("Bir şey yazmalısınız!");
    return;
  }

  if (selectValue === 'Tür') {
    alert("Bir tür seçmelisiniz!");
    return;
  }

  // list için text yaz
  var t = document.createTextNode(inputValue);
  li.appendChild(t);

  //seçilen kategoriyi değer olarak depola
  li.setAttribute('value', selectValue);

  //yeni liste elemanını üstteki yere ekle 
  document.getElementById("myUL").appendChild(li);

  //ekledikten sonra arama barını temizle
  document.getElementById("myInput").value = "";
  
  // seçip ekledikten sonra çubuğu tür yazısına geri getir
  document.getElementById("categorySelect").selectedIndex = 0;

  // çarpı ekle
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("x");
  span.className = "close"; 
  span.appendChild(txt);
  li.appendChild(span);

  // çarpı düğmesine click event ekle
  span.onclick = function() {
    var listItem = this.parentElement;
    var category = listItem.getAttribute('value');
    
    // kategoriye uygun kartı bul
    var cards = document.getElementsByClassName('card');
    for (var j = 0; j < cards.length; j++) {
      var cardHeader = cards[j].querySelector('.card-header');
      if (cardHeader && cardHeader.textContent.trim() === category) {
        // kartta liste boşsa yenisini yarat 
        var cardList = cards[j].querySelector('ul');
        if (!cardList) {
          cardList = document.createElement('ul');
          cards[j].appendChild(cardList);
        }
        
        // klonla
        var newItem = listItem.cloneNode(true);
        newItem.removeChild(newItem.querySelector('.close'));
        
        // yeniyi ekle
        cardList.appendChild(newItem);
        
        // orjinalden sil
        listItem.remove();
        break;
      }
    }
  };
}

// filters1 event listeners
document.querySelector('.filters1').addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON') {
    const filterValue = e.target.textContent.trim();
    filterMainList(filterValue);
    
    //butonlar
    document.querySelectorAll('.filters1 button').forEach(btn => {
      btn.classList.remove('active');
    });
    e.target.classList.add('active');
  }
});

// filters2 event
document.querySelector('.filters2').addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON') {
    const filterValue = e.target.textContent.trim();
    filterCards(filterValue);
    
    // butonlar
    document.querySelectorAll('.filters2 button').forEach(btn => {
      btn.classList.remove('active');
    });
    e.target.classList.add('active');
  }
});

// butonların myUL'ı filtrelemesi
function filterMainList(category) {
  const listItems = document.getElementById('myUL').getElementsByTagName('li');
  
  for (let item of listItems) {
    const itemCategory = item.getAttribute('value');
    
    if (category === 'Tüm Değerler' || itemCategory === category) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  }
}

// butonların kartları filtrelemesi
function filterCards(category) {
  const cards = document.getElementsByClassName('card');
  
  for (let card of cards) {
    const cardHeader = card.querySelector('.card-header');
    const cardCategory = cardHeader ? cardHeader.textContent.trim() : '';
    
    if (category === 'Tüm Değerler' || cardCategory === category) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  }
}