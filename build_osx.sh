d=`dirname $0`
cd $d

cd chrome
rm -f xmystats.jar

zip -r xmystats.jar content/* skin/*

cd ..
zip ../xmystats.xpi chrome/xmystats.jar install.rdf chrome.manifest

cd chrome
rm -f xmystats.jar
