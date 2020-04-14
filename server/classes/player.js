// Player
// Name (String)
// SpyMaster? (True,False,Null)
// Team (B/R, Null)

module.exports = class Player {
    constructor(name) {
        this.name = name;
        this.team = null;
        this.isSpyMaster = false;
    }
}