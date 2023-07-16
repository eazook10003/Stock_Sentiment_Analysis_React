from flask import Flask, request, jsonify
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import pandas as pd
from flask_cors import CORS
from datetime import datetime
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route("/<ticker>", methods=['GET'])
def members(ticker):
    # The input dates from the user (via a GET request)
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    print("start date000: ", start_date, end_date)

    start_date = datetime.strptime(start_date, '%d/%m/%Y')
    end_date = datetime.strptime(end_date, '%d/%m/%Y')

    print("start date123: ", start_date, end_date)

    finviz_url = "https://finviz.com/quote.ashx?t="

    news_tables = {}

    url = finviz_url + ticker

    req = Request(url=url, headers={'user-agent': 'my-app'})
    response = urlopen(req)
    
    html = BeautifulSoup(response ,features="lxml")
    news_table = html.find(id='news-table')
    news_tables[ticker] = news_table
    print(news_table)
    if news_table is None:
        print("Ticker not found")
        return jsonify({'error': 'Ticker not found'}), 404
    parsed_data = []
    ratings = []
    for ticker, news_table in news_tables.items():
        for row in news_table.findAll('tr'):
            if row.a is not None:   # Only process the row if there is an anchor tag
                link = row.a['href'] 
                title = row.a.text
                date_data = row.td.text.split(' ')
                date_data = [x.replace("\r\n","") for x in date_data]
                date_data = list(filter(None, date_data))
                if len(date_data) == 1:
                    time = date_data[0]
                else:
                    date = date_data[0]
                    time = date_data[1]
                    news_date = datetime.strptime(date, "%b-%d-%y")
                    # print("date original: ", date)
                    # print("news_date: ", news_date)
                    d = news_date.strftime("%b-%d-%y")
                    # print("new one after strftime: ", d)
                if start_date <= news_date <= end_date:
                        parsed_data.append([ticker, d, time, title, link])  
    
    ratings_table = html.find("table", attrs={"class": "js-table-ratings fullview-ratings-outer"})
    if ratings_table is not None:
        for row in ratings_table.findAll("tr", attrs={"class": re.compile(r"body-table-rating-\w+")}):
            tds = row.find_all("td", attrs={"width": "320"})
            date_td = row.find("td", attrs={"width": "140"})
            if len(tds) >= 4:
                name_td = tds[1].text.strip()
                price_info_td = tds[3].text.strip()
            else:
                print("Unexpected format")
            if date_td is not None and name_td is not None and price_info_td is not None:
                date = date_td.text
                ratings.append([date, name_td, price_info_td])

    df_ratings = pd.DataFrame(ratings, columns=['date1', 'name', 'prices'])
    df_news = pd.DataFrame(parsed_data, columns=['ticker', 'date', 'time', 'title', 'link'])
    vader = SentimentIntensityAnalyzer()
    f = lambda title: vader.polarity_scores(title)['compound']
    df_news['compound'] = df_news['title'].apply(f)
    df_news_json = df_news.to_json(orient='records')  
    df_ratings_json = df_ratings.to_json(orient='records') 
    result = {"news": df_news_json, "ratings": df_ratings_json} 
    print(result)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
