$(function(){
    //HELPER
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    };

    function initSortable() {
        $('.column-card-list').sortable({
          connectWith: '.column-card-list',
          placeholder: 'card-placeholder'
        }).disableSelection();
    };

    //BOARD OBJECT
    var board = {
        name: 'Kanban Board',
        $columnContainer: $('#board .column-container'),
        addColumn: function(column) {
          this.$columnContainer.append(column.$element);
          initSortable();
        }
    };

    //ADD NEW COLUMN TO BOARD
    $('.create-column').click(function(){
      board.addColumn(new Column(prompt('Enter a column name')));
    });

    // COLUMN CLASS
    function Column(name) {
        var self = this;    

        //PROPERTIES
        this.id = randomString();
        this.name = name;       
        this.$element = createColumn();    

        
        function createColumn() {
            // COMPONENTS
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

            // EVENTS
            $columnDelete.click(function() {
                self.removeColumn();
            });
            $columnAddCard.click(function(event) {
				event.preventDefault();
                self.addCard(new Card(prompt("Enter the name of the card")));
            });

            // COMBINE COMPONENTS
            $column.append($columnTitle)
                   .append($columnDelete)
                   .append($columnAddCard)
                   .append($columnCardList);

            return $column;
        }
    }

    // METHOD FOR COLUMN CLASS

    Column.prototype = {
        addCard: function(card) {
          this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
          this.$element.remove();
        }
    };

    //CARD CLASS
    function Card(description) {
        var self = this;

        //PROPERTIES
        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            // COMPONENTS
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');
        
            // EVENT
            $cardDelete.click(function(){
                        self.removeCard();
            });
        
            // COMBINE COMPONENTS
            $card.append($cardDelete)
                    .append($cardDescription);
        
            return $card;
        }
    };

    // METHOD FOR CARD CLASS
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    };
    
    //INIT BOARD
    //COLUMNS
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // ADD COLUMNS
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // CARDS
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // ADD CARDS
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);

})