class user_symbols {
    constructor(db) {
        this.db = db;
    }

    async add ({userID,symbol}) {
        return this.db.execute(`
        insert into users_symbols(user_id,symbol)
        values (?, ?)`, [userID,symbol]);
    };

    async findByUserID ({userID}) {
        return this.db.execute(`
        select * from users_symbols where user_id = ?`, [userID]);
    };

    async getSymbols() {
        return this.db.execute(`
        select distinct(symbol) from users_symbols`);
    }
     
}

module.exports = user_symbols;