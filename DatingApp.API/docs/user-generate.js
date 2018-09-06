[
    '{{repeat(5)}}', {
           Username: '{{firstName("female")}}',
           Gender: 'female',
           DateOfBirth: '{{date(new Date(2017,0,1),new Date(2017,11,31),"YYYY-MM-dd")}}',
           Password: 'password',
           KnownAs: function(){ return this.Username;},
           DateCreated: '{{date(new Date(2017,0,1),new Date(2017,11,31),"YYYY-MM-dd")}}',
           LastActive: function(){ return this.DateCreated;},
           Introduction: '{{lorem(1,"paragraphs")}}',
           LookingForr: '{{lorem(1,"paragraphs")}}',
           Interests:  '{{lorem(1,"paragraphs")}}',
           City: '{{City()}}',
           Country: '{{Country()}}',
           Photos: [
               {
                   url: function(num){
                       return 'https://randomuser.me/api/portraits/women/' + num.integer(1,100) + '.jpg';
                   },
                   isMain: true,
                   descriptions: '{{lorem()}}'
               }
           ]
    }
    
]