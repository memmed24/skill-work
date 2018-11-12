const config = function() {
  this.sekret = 'geheimerSchlussel';
  
  this.db_url = `mongodb://127.0.0.1`;
  this.db_port = `27017`;
  this.db_name = 'todo';
  this.getDbUrl = () => {
    return `${this.db_url}:${this.db_port}/${this.db_name}`
  }

}

var conf = new config();
module.exports = conf;