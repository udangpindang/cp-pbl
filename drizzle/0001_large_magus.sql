CREATE TABLE "observations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"latitude" real NOT NULL,
	"longitude" real NOT NULL,
	"warning_level" varchar(20) NOT NULL,
	"water_level" real NOT NULL,
	"last_updated" timestamp DEFAULT now() NOT NULL
);
