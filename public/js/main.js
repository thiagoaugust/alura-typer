var tempoInicial = $("#contador-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
	atualizarTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaTesteCampo();
	$("#botao-reiniciar").click(reiniciaJogo);
});	


function atualizarTamanhoFrase(){
	var frase = $(".frase").text();
	var tamanhoFrase = frase.split(" ").length;
	$("#tamanho-frase").text(tamanhoFrase);
}

function inicializaContadores(){
	
	campo.on("input",function(){
		var conteudo = campo.val();
		var qtdePalavras = conteudo.split(/\S+/).length-1;
		$("#contador-palavras").text(qtdePalavras);

		var qtdeCaracteres = conteudo.length;
		$("#contador-caracteres").text(qtdeCaracteres);
	});
}

function inicializaTesteCampo(){
	var frase = $(".frase").text();
	campo.on("input", function(){
		var digitado = campo.val();
		var comparavel = frase.substr(0,digitado.length);
		if(digitado==comparavel){
			campo.addClass("borda-verde");
			campo.removeClass("borda-vermelha");
		}else{
			campo.addClass("borda-vermelha");
			campo.removeClass("borda-verde");
		}
	});
}


function inicializaCronometro(){
	var tempoRestante = $("#contador-digitacao").text();
	campo.one("focus",function(){
		var idContador = setInterval(function(){
			tempoRestante--;
			$("#contador-digitacao").text(tempoRestante);
			if(tempoRestante<1){
				clearInterval(idContador);
				campo.attr("disabled",true);
				campo.addClass("campo-desativado");
				inserePlacar();
			}
		},1000)
	});
}

function inserePlacar(){
	var corpoTabela = $(".placar").find("tbody");
	var usuario = "Thiagao";
	var numPalavras = $("#contador-palavras").text();
	
	var linha = novaLinha(usuario,numPalavras);
	linha.find(".botao-remover").click(removeLinha);
	corpoTabela.prepend(linha);
}

function novaLinha(usuario,numPalavras){
	var linha = $("<tr>");
	var colunaUsuario = $("<td>").text(usuario);
	var colunaPalavras = $("<td>").text(numPalavras);
	var colunaRemover = $("<td>");
	var tagA = $("<a>").addClass("botao-remover").attr("href","#");
	var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

	tagA.append(icone);
	colunaRemover.append(tagA);
	linha.append(colunaUsuario);
	linha.append(colunaPalavras);
	linha.append(colunaRemover);

	return linha
}

function removeLinha(){
	event.preventDefault();
	$(this).parent().parent().remove();

}

function reiniciaJogo(){
	campo.removeClass("campo-desativado");
	campo.removeClass("borda-verde");
	campo.removeClass("borda-vermelha");
	campo.val("");
	campo.attr("disabled",false);
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
	$("#contador-digitacao").text(tempoInicial);
	inicializaCronometro();
}

