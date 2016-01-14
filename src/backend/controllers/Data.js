var fs = require('fs');
module.exports.controller = function (app) {
	app.all(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  next();
	});
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	app.get('/data/translations', function (req, res) {
    res.json({
      "stat.killEntity.Blaze": "Number of Blazes killed",
			"stat.deaths": "Number of deaths",
      "stat.killEntity.PigZombie": "Number of Pig Zombies killed",
			"stat.useItem.3": "Number of Dirt blocks placed",
      "stat.killEntity.Village": "Number of Villagers killed",
			"stat.killEntity.enderzoo.Enderminy": "Number of Enderminys killed",
			"stat.killEntity.enderzoo.FallenKnight": "Number of Fallen Knights killed",
      "achievement.botania:flowerPickup": "Number of flowers picked up",
      "stat.killEntity.Enderman": "Number of Endermans killed",
      "stat.killEntity.witherSkeleton": "Number of Wither Skeletons killed",
      "stat.killEntity.enderzoo.ConcussionCreeper": "Number of Concussion Creepers killed",
      "stat.killEntity.enderzoo.WitherCat": "Number of Wither Cats killed",
      "stat.killEntity.LavaSlime": "Number of Lava Slimes killed",
      "stat.killEntity.ChocoboYellow": "Number of Yellow Chocobos killed",
      "stat.killEntity.ClayGolem": "Number of Clay Colem killed",
      "stat.killEntity.Blitz": "Number of Blitz killed",
      "stat.killEntity.Squid": "Number of Squid killed",
      "stat.killEntity.enderzoo.WitherWitch": "Number of Wither Witchs killed",
      "stat.killEntity.Sheep": "Number of Sheeps killed",
      "stat.killEntity.Zombie": "Number of Zombies killed",
      "stat.killEntity.Slime": "Number of Slimes killed",
      "stat.killEntity.CaveSpider": "Number of Cave Spiders killed",
      "stat.killEntity.Cow": "Number of Cows Killed",
      "stat.killEntity.Skeleton": "Number of Skeletons killed",
      "stat.killEntity.Chicken": "Number of Chickens killed",
      "stat.killEntity.Spider": "Number of Spiders killed",
			"achievement.openInventory": "Number of times opening inventory"
    });
	});
};
