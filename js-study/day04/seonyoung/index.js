    // Get your shorts on - this is an array workout!
    // ## Array Cardio Day 1

    // Some data we can work with

    const inventors = [
        { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
        { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
        { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
        { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
        { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
        { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
        { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
        { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
        { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
        { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
        { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
        { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
      ];
  
    const people = [
        'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
        'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
        'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
        'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
        'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
    ];
      
      // Array.prototype.filter()
      // 1. Filter the list of inventors for those who were born in the 1500's
      const a1 = inventors.filter((inventor) => inventor.year >=1500 && inventor.year <1600);
      console.table(a1);
  
      // Array.prototype.map()
      // 2. Give us an array of the inventors first and last names
      const a2 = inventors.map((inventor) => inventor.first + inventor.last);
      console.log(a2);

      // Array.prototype.sort()
      // 3. Sort the inventors by birthdate, oldest to youngest
      const a3 = inventors.sort((a,b) => a.year-b.passed);
      console.log(a3);

      // Array.prototype.reduce()
      // 4. How many years did all the inventors live all together?
      var total = 0;
      const a4 = inventors.reduce((total, inventor)=>{
          return total + (inventor.passed-inventor.year);
      }, 0);
      console.log(a4);

      // 5. Sort the inventors by years lived
      const a5 = inventors.sort(function(a,b) {
        const inventor_a = a.passed - a.year;
        const inventor_b = b.passed - b.year;
        return inventor_a - inventor_b;
      });
      console.table(a5);

      // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
      // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

      // 7. sort Exercise
      // Sort the people alphabetically by last name
    
      const a7 = people.sort((a, b) => {
          const [last_a, first_a] = a.split(', ');
          const [last_b, first_b] = b.split(', ');
          return last_a > last_b ? 1 : -1;  
          // last_b가 더 작으면 1(last_a 뒤에 last_b가 오도록) & last_b 가 더 크면 -1(더 작은 last_a가 큰 last_b보다 앞에 오도록)
      });
      console.table(a7);

      // 8. Reduce Exercise
      // Sum up the instances of each of these
      const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
      const a8 = data.reduce(function(obj, item){
          if(!obj[item]){
              obj[item] = 0; //초기화
          }
          obj[item]++;
          return obj
      },{});
      console.log(a8);