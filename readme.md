Stargate API Docs
------------------------------------------------------


Project_Atlantis = {
	Stargates: [
		{
			address: String,
			discription: String,
			aliases: array (strings),
			title: string,
			created: datetime,
			modified: datetime
		}
	],
	Articles: [
		{
			id: Number,
			title: String,
			authors: Array (strings),
			categories: Array (strings),
			contents: String,
			tags: Array (strings),
			created: datetime,
			modified: datetime
		}
	],
	Photos: [
		{
			id: Number,
			tags: array (strings),
			discription: String,
			uri: String
		}
	]
}

GET /stargate/{ADDRESS}: Gets the content of a stargate via the address.
returns a single stargate entry.

GET /stargate: Returns the entire stargate database array.

POST /stargate/{ADDRESS}: Creates a new stargate entry for a given address
so long as that address does not already exist in the database.

PUT /stargate/{ADDRESS}: Updates a stargate entry at the given address,
does not create new entries.
