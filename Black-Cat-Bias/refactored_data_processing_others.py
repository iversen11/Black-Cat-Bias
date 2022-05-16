#Script to process data from Austin Animal Centers Outcome
# After decision to refactor to only black cats vs all other cats, this can be refactored to be more efficient

import sys
from pyspark.sql import SparkSession
from pyspark.sql.functions import count, col, split, sequence, avg


if __name__ == '__main__': 

	#throw error if file not input 
	if len(sys.argv) != 2:
		print(sys.stderr)
		sys.exit(-1)
	
	#build spark session
	spark = (SparkSession
		.builder
		.appName('blackCatProcessing')
		.getOrCreate())

	data = sys.argv[1]

	#create months with index to allow for sorting by month later 
	months = [("Jan", 0), ("Feb", 1), ("Mar",2), ("Apr", 3), ("May", 4), ("Jun", 5), ("Jul", 6), ("Aug", 7), ("Sep", 8), ("Oct", 9), ("Nov", 10), ("Dec", 11)]
	month_index = spark.createDataFrame(months,("Month", "MonthIndex"))

	#Read data to spark
	bc_data = (spark.read.format("csv")
			.option("header", "true")
			.option("InferSchema","true")
			.load(data))



	#pull colors for black cats, find monthly total frequencies without owner returns 
	color_freq = (bc_data
			.select("Animal Type", "Color", "MonthYear")
			.where((col("Animal Type") == "Cat") & (col("Outcome Type") != "Return to Owner") & (col("Outcome Type") != "Rto-Adopt") & ~(col("Color") == "Black"))	
			.groupBy("MonthYear")
			.agg(count("Color").alias("color_count"))
			.orderBy("MonthYear", ascending = False)
			)
	

	#select relevant columns, filter to adoptions, group, and count outcome rate
	count_bc = (bc_data
			.select("MonthYear", "Outcome Type", "Outcome Subtype", "Animal Type", "Sex upon Outcome", "Color")
			.where((col("Outcome Type") == "Adoption") & (col("Animal Type") == "Cat") & ~(col("Color") == "Black")) 
			.groupBy("MonthYear")
			.agg(count("Outcome Type").alias("outcome_count"))
			.orderBy("MonthYear"))

	#merge columns to allow calculations, create columns for month and year for cumulative sums 
	final_df = (count_bc
			.join(color_freq, ["MonthYear"])
			.withColumn("monthly_divBy_total",(col("outcome_count")/col("color_count"))*100)
			.withColumn("Year", split(col("MonthYear"), " ").getItem(1))
			.withColumn("Month", split(col("MonthYear"), " ").getItem(0))
			.join(month_index, "Month")
			.groupBy("Year")
			.agg(avg("monthly_divBy_total").alias("average_rate"))
			.orderBy(["Year"])
			)

	final_df.coalesce(1).write.option("header", True).csv("refactored_others_data.csv")
