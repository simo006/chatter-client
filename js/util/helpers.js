String.prototype.truncate = function (size) {
    if (this.length + 3 > size) {
        return this.slice(0, size) + "...";
    } else {
        return this;
    }
}