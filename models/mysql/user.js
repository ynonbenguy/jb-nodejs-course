class user {
    constructor(db) {
        this.db = db;
    }

    async add ({gitHubID}) {
        return this.db.execute(`
        insert into users(github_id) values (?)`, [gitHubID]);
    };

    async findByGithubid ({gitHubID}) {
        return this.db.execute(`
        select * from users where github_id=?`, [gitHubID]);
    };
     
    async findByPK ({ID}) {
        return this.db.execute(`
        select * from users where id=?`, [ID]);
    };
     
}

module.exports = user;