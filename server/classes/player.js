// Player
// Name (String)
// SpyMaster? (True,False,Null)
// Team (B/R, Null)

module.exports = class Player {
    constructor(name, id, isAdmin) {
        this.id = id;
        this.name = name;
        this.team = null;
        this.isSpyMaster = false;
        this.isAdmin = isAdmin;
    }
}