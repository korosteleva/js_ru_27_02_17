export default function filter(articles, filters) {
    let filterFromDate = filters.from ? new Date(filters.from).getTime() : null;
    let filterToDate = filters.to ? new Date(filters.to).getTime() : null;

    return articles.filter(article => {
        let articleDate = new Date(article.date).getTime();
        let filteredArticle = filters.articleIds.filter(id => id === article.id);

        let conditionFromDate = filterFromDate ? articleDate >= filterFromDate : true;
        let conditionToDate = filterToDate ? articleDate <= filterToDate : true;
        let conditionArticles = filters.articleIds.length ? filteredArticle.length : true;

        return conditionFromDate && conditionToDate && conditionArticles;
    });
}
