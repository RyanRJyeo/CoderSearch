CREATE TABLE IF NOT EXISTS coders(
	id SERIAL PRIMARY KEY,
	email TEXT UNIQUE,
	password TEXT,
	registered_on TIMESTAMPTZ DEFAULT now(),
	occupation_type TEXT,
	name TEXT,
	image TEXT,
	language TEXT,
	framework TEXT,
	description TEXT,
	street TEXT,
	city TEXT,
	state TEXT,
	zip TEXT,
	country TEXT,
	address TEXT,
	lat TEXT,
	long TEXT
);


CREATE TABLE IF NOT EXISTS searchers(
	id SERIAL PRIMARY KEY,
	email TEXT UNIQUE,
	password TEXT,
	registered_on TIMESTAMPTZ DEFAULT now(),
	name TEXT,
	image TEXT,
	language TEXT,
	framework TEXT,
	description TEXT,
	street TEXT,
	city TEXT,
	state TEXT,
	zip TEXT,
	country TEXT,
	address TEXT,
	lat TEXT,
	long TEXT
);

CREATE TABLE IF NOT EXISTS convos(
	id SERIAL PRIMARY KEY,
	searcher_id INTEGER,
	coder_id INTEGER,
	UNIQUE (searcher_id, coder_id)
);

CREATE TABLE IF NOT EXISTS chats(
	id SERIAL PRIMARY KEY,
	convo_id INTEGER,
	sender_id INTEGER,
	receiver_id INTEGER
);