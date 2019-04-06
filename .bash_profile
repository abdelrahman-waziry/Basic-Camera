createComponent(){
	cd app/components
	mkdir "$1"
	cd "$1"
	touch "$1.js"
	touch "style.js"
	cd ../../..
}