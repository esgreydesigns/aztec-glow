CREATE TABLE `generated_content` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`category` text NOT NULL,
	`ai_provider` text NOT NULL,
	`prompt` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`tags` text,
	`word_count` integer,
	`export_format` text DEFAULT 'txt'
);
